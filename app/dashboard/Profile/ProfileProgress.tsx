export default function ProfileProgress({ percent }: { percent: number }) {
  return (
    <div className="px-4 mt-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">
          Profile {percent}% complete
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded mt-2">
        <div
          className="h-2 bg-black rounded"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
