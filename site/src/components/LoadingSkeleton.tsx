export function CardSkeleton() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800">
      <div className="animate-pulse">
        <div className="mb-4 h-6 w-20 rounded-full bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-32 rounded-full bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="w-full pt-6">
      <div className="animate-pulse rounded border border-gray-200 p-4 shadow dark:border-gray-700">
        <div className="flex h-[40vh] items-end justify-around space-x-2 px-4">
          <div className="h-[10%] w-12 bg-gray-200 dark:bg-gray-700" />
          <div className="h-[20%] w-12 bg-gray-200 dark:bg-gray-700" />
          <div className="h-[30%] w-12 bg-gray-200 dark:bg-gray-700" />
          <div className="h-[60%] w-12 bg-gray-200 dark:bg-gray-700" />
          <div className="h-[80%] w-12 bg-gray-200 dark:bg-gray-700" />
          <div className="h-[40%] w-12 bg-gray-200 dark:bg-gray-700" />
          <div className="h-[60%] w-12 bg-gray-200 dark:bg-gray-700" />
          <div className="h-[70%] w-12 bg-gray-200 dark:bg-gray-700" />
          <div className="h-[85%] w-12 bg-gray-200 dark:bg-gray-700" />
          <div className="h-[95%] w-12 bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  );
}
