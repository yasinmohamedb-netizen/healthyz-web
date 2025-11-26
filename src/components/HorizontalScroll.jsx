export default function HorizontalScroll({ children }) {
  return (
    <div className="flex overflow-x-auto gap-4 pb-2 scrollbar-hide">
      {children}
    </div>
  );
}
