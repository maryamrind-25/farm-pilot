import { createClient } from "@/utils/supabase/server";
import { getCurrentUser } from "@/lib/auth";
import { BookingForm } from "@/components/BookingForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function NewBookingPage() {
  const user = await getCurrentUser();
  const supabase = await createClient();

  const [{ data: farmer }, { data: centers }] = await Promise.all([
    supabase
      .from("farmers")
      .select("registration_status")
      .eq("farmer_id", user.id)
      .single(),
    supabase
      .from("procurement_centers")
      .select("center_id, center_name, location")
      .order("center_name"),
  ]);

  const status = farmer?.registration_status;

  // RLS blocks unapproved farmers anyway; this just gives a clear message
  if (status !== "approved") {
    return (
      <Card className="mx-auto max-w-xl">
        <CardHeader>
          <CardTitle>Booking unavailable</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          {status === "rejected"
            ? "Your registration was rejected. Please contact your procurement center."
            : "Your registration is pending approval. You can book a slot once a center approves it."}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <h1 className="text-2xl font-semibold">Book a slot</h1>
      <BookingForm centers={centers ?? []} />
    </div>
  );
}