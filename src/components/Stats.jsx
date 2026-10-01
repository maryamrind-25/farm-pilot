import React from 'react';

const stats = [
  {
    id: 1,
    value: '4+',
    label: 'Core Features',
  },
  {
    id: 2,
    value: '24/7',
    label: 'Digital Access',
  },
  {
    id: 3,
    value: '100%',
    label: 'Digital Records',
  },
  {
    id: 4,
    value: '1 Platform',
    label: 'For Farmers & Centers',
  },
];

export default function Stats() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="rounded-3xl border border-gray-100 bg-gray-50/50 p-8 sm:p-10 transition-shadow duration-300 hover:shadow-sm">
          <dl className="grid grid-cols-1 gap-y-12 gap-x-8 text-center sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-gray-200">
            {stats.map((stat, index) => (
              <div 
                key={stat.id} 
                className={`flex flex-col gap-y-3 px-4 group ${
                  index % 2 === 0 ? 'sm:border-r sm:border-gray-200 lg:border-none' : ''
                }`}
              >
                <dt className="text-base font-medium leading-7 text-gray-500">{stat.label}</dt>
                <dd className="order-first text-4xl font-bold tracking-tight text-primary sm:text-5xl transition-transform duration-300 group-hover:scale-105">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
