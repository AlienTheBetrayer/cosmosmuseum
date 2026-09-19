import { Card } from "@/features/ui/cards/ui/Card";

export const Cards = () => {
  return (
    <div className="flex flex-col gap-8 justify-center items-center gap-2 w-full max-w-6xl mx-auto h-full ">
      <h2 className="text-3xl font-semibold" id="exhibits">
        Exhibits
      </h2>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full h-full gap-4">
        <li>
          <Card src="/exhibits/exhibit1.jpg"></Card>
        </li>

        <li>
          <Card src="/exhibits/exhibit2.jpg"></Card>
        </li>

        <li>
          <Card src="/exhibits/exhibit3.jpg"></Card>
        </li>

        <li>
          <Card src="/exhibits/exhibit4.jpg"></Card>
        </li>

        <li>
          <Card src="/exhibits/exhibit5.jpg"></Card>
        </li>

        <li>
          <Card src="/exhibits/exhibit6.jpg"></Card>
        </li>

        <li>
          <Card src="/exhibits/exhibit7.jpg"></Card>
        </li>

        <li>
          <Card src="/exhibits/exhibit8.jpg"></Card>
        </li>

        <li>
          <Card src="/exhibits/exhibit9.jpg"></Card>
        </li>

        <li>
          <Card src="/exhibits/exhibit10.jpg"></Card>
        </li>

        <li>
          <Card src="/exhibits/exhibit11.jpg"></Card>
        </li>

        <li>
          <Card src="/exhibits/exhibit12.jpg"></Card>
        </li>

        <li>
          <Card src="/exhibits/exhibit13.jpg"></Card>
        </li>

        <li>
          <Card src="/exhibits/exhibit14.jpg"></Card>
        </li>

        <li>
          <Card src="/exhibits/exhibit15.jpg"></Card>
        </li>
      </ul>
    </div>
  );
};
