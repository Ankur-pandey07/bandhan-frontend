"use client";

type Props = {
  yourName: string;
  yourDOB: string;
  yourPlace: string;
  partnerName: string;
  partnerDOB: string;
  partnerPlace: string;
};

export default function ProfileSummary({
  yourName,
  yourDOB,
  yourPlace,
  partnerName,
  partnerDOB,
  partnerPlace,
}: Props) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow space-y-6">

      <h3 className="text-sm font-medium text-gray-500">
        Please review your details
      </h3>

      <div className="grid md:grid-cols-2 gap-6">

        {/* YOUR DETAILS */}
        <div className="rounded-2xl bg-[#FAF8F5] p-4">
          <h4 className="text-sm font-medium mb-2">You</h4>
          <p className="text-sm">Name: {yourName}</p>
          <p className="text-sm">DOB: {yourDOB}</p>
          <p className="text-sm">Place: {yourPlace}</p>
        </div>

        {/* PARTNER DETAILS */}
        <div className="rounded-2xl bg-[#FAF8F5] p-4">
          <h4 className="text-sm font-medium mb-2">Partner</h4>
          <p className="text-sm">Name: {partnerName}</p>
          <p className="text-sm">DOB: {partnerDOB}</p>
          <p className="text-sm">Place: {partnerPlace}</p>
        </div>

      </div>
    </div>
  );
}
