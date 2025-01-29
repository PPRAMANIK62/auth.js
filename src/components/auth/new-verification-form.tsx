"use client";

import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import CardWrapper from "./card-wrapper";

const NewVerificationForm = () => {
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    console.log(token);
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center w-full justify-center">
        <Loader2 className="size-8 animate-spin" />
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;
