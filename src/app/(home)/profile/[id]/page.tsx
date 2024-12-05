"use client";
export default function ProfilePageId({ params }: { params: { id: string } }) {
  console.log(params);
  const { id } = params;

  return <>{id}</>;
}
