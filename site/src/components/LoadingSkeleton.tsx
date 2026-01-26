export function CardSkeleton() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3 shadow dark:border-gray-700 dark:bg-gray-800 sm:p-4">
      <div className="animate-pulse">
        <div className="mx-auto mb-3 h-5 w-16 rounded-full bg-gray-200 dark:bg-gray-700 sm:h-6 sm:w-20" />
        <div className="mx-auto h-3 w-20 rounded-full bg-gray-200 dark:bg-gray-700 sm:h-4 sm:w-24" />
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="w-full pt-4 sm:pt-6">
      <div className="animate-pulse rounded border border-gray-200 p-2 shadow dark:border-gray-700 sm:p-4">
        <div className="flex h-[45vh] items-end justify-around space-x-1 px-2 sm:h-[40vh] sm:space-x-2 sm:px-4">
          <div className="h-[10%] w-4 bg-gray-200 dark:bg-gray-700 sm:w-8" />
          <div className="h-[20%] w-4 bg-gray-200 dark:bg-gray-700 sm:w-8" />
          <div className="h-[30%] w-4 bg-gray-200 dark:bg-gray-700 sm:w-8" />
          <div className="h-[60%] w-4 bg-gray-200 dark:bg-gray-700 sm:w-8" />
          <div className="h-[80%] w-4 bg-gray-200 dark:bg-gray-700 sm:w-8" />
          <div className="h-[40%] w-4 bg-gray-200 dark:bg-gray-700 sm:w-8" />
          <div className="h-[60%] w-4 bg-gray-200 dark:bg-gray-700 sm:w-8" />
          <div className="h-[70%] w-4 bg-gray-200 dark:bg-gray-700 sm:w-8" />
          <div className="h-[85%] w-4 bg-gray-200 dark:bg-gray-700 sm:w-8" />
          <div className="h-[95%] w-4 bg-gray-200 dark:bg-gray-700 sm:w-8" />
        </div>
      </div>
    </div>
  );
}
