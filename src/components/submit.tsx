"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { Icons } from "~/components/icons";
import { Button } from "~/components/ui/button";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" /> : null}{" "}
      Submit
    </Button>
  );
}
