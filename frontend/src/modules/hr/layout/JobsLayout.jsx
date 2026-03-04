export default function JobsLayout({ sidebar, content }) {
  return (
    <div className="max-w-6xl mx-auto px-6 mt-8">
      <div className="grid lg:grid-cols-12 gap-8">
        <aside className="lg:col-span-3 lg:sticky lg:top-24">{sidebar}</aside>

        <main className="lg:col-span-9 space-y-6">{content}</main>
      </div>
    </div>
  );
}
