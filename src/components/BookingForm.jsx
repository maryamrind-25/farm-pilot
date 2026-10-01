"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CROPS = ["Wheat", "Rice", "Cotton", "Sugarcane", "Maize", "Potato", "Onion", "Tomato"];

const SLOTS = [
  "08:00-09:00",
  "09:00-10:00",
  "10:00-11:00",
  "11:00-12:00",
  "12:00-13:00",
  "13:00-14:00",
  "14:00-15:00",
  "15:00-16:00",
  "16:00-17:00",
];

const MAX_DAYS_AHEAD = 14;

const selectClass =
  "h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:opacity-50";

// Local date as YYYY-MM-DD (toISOString would give the UTC date)
const toDateStr = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;

// Slots whose start hour has already begun are not bookable today
const isPastSlot = (dateStr, slot) => {
  if (dateStr !== toDateStr(new Date())) return false;
  return new Date().getHours() >= Number(slot.split(":")[0]);
};

export const BookingForm = ({ centers }) => {
  const supabase = createClient();
  const [isPending, startTransition] = useTransition();

  const [centerId, setCenterId] = useState("");
  const [crop, setCrop] = useState("");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [error, setError] = useState(null);
  const [booked, setBooked] = useState(null);

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + MAX_DAYS_AHEAD);

  const handleDateChange = (value) => {
    setDate(value);
    // Clear the slot if it's no longer valid for the new date
    if (slot && isPastSlot(value, slot)) setSlot("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!centerId || !crop || !quantity || !date || !slot) {
      setError("Please fill in every field and pick a time slot.");
      return;
    }

    startTransition(async () => {
      const { data, error } = await supabase
        .from("bookings")
        .insert({
          center_id: centerId,
          crop_type: crop,
          estimated_quantity: Number(quantity),
          booking_date: date,
          time_slot: slot,
        })
        .select("token_number, booking_date, time_slot, crop_type")
        .single();

      if (error) {
        setError(
          error.code === "42501"
            ? "Your registration must be approved before you can book."
            : error.message
        );
        return;
      }

      setBooked({
        ...data,
        center: centers.find((c) => c.center_id === centerId),
      });
    });
  };

  const resetForm = () => {
    setBooked(null);
    setSlot("");
    setQuantity("");
    setError(null);
  };

  // ---------- Success: show the token ----------
  if (booked) {
    return (
      <Card>
        <CardHeader className="items-center text-center">
          <CheckCircle2 className="size-10 text-green-600" />
          <CardTitle className="text-xl">Booking confirmed</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <div>
            <p className="text-sm text-muted-foreground">Your token number</p>
            <p className="text-5xl font-bold tracking-tight">#{booked.token_number}</p>
          </div>
          <div className="space-y-1 text-sm">
            <p className="font-medium">{booked.center?.center_name}</p>
            <p className="text-muted-foreground">{booked.center?.location}</p>
            <p>
              {booked.booking_date} &middot; {booked.time_slot}
            </p>
            <p>{booked.crop_type}</p>
          </div>
        </CardContent>
        <CardFooter className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={resetForm}>
            Book another
          </Button>
          <Link
            href="/farmer/bookings"
            className="inline-flex h-9 flex-1 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            My bookings
          </Link>
        </CardFooter>
      </Card>
    );
  }

  // ---------- Form ----------
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardContent className="grid gap-5">
          <div className="grid gap-1.5">
            <Label htmlFor="center">Procurement center</Label>
            <select
              id="center"
              className={selectClass}
              value={centerId}
              onChange={(e) => setCenterId(e.target.value)}
              disabled={isPending}
            >
              <option value="">Select a center</option>
              {centers.map((c) => (
                <option key={c.center_id} value={c.center_id}>
                  {c.center_name} - {c.location}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <Label htmlFor="crop">Crop type</Label>
              <select
                id="crop"
                className={selectClass}
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                disabled={isPending}
              >
                <option value="">Select a crop</option>
                {CROPS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="quantity">Estimated quantity (kg)</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                step="1"
                placeholder="e.g. 500"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                disabled={isPending}
              />
            </div>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              min={toDateStr(today)}
              max={toDateStr(maxDate)}
              value={date}
              onChange={(e) => handleDateChange(e.target.value)}
              disabled={isPending}
              suppressHydrationWarning
            />
          </div>

          <div className="grid gap-1.5">
            <Label>Time slot</Label>
            {!date ? (
              <p className="text-sm text-muted-foreground">Pick a date to see time slots.</p>
            ) : (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {SLOTS.map((s) => {
                  const past = isPastSlot(date, s);
                  return (
                    <Button
                      key={s}
                      type="button"
                      variant={slot === s ? "default" : "outline"}
                      disabled={past || isPending}
                      onClick={() => setSlot(s)}
                    >
                      {s}
                    </Button>
                  );
                })}
              </div>
            )}
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
        </CardContent>

        <CardFooter className="mt-4">
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? <Loader2 className="animate-spin" /> : "Confirm booking"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};