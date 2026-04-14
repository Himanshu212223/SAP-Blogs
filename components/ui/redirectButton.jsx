import React from "react";
import { ArrowUpRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const RedirectButton = (props) => {

    const {text, link} = props ;

  return (
    <Link href={link} target="_blank" className="w-auto inline-block cursor-pointer">
    <div className="flex items-start gap-1">
      {/* <Button variant="outline" className="cursor-pointer">{text}</Button> */}
      <Button className="cursor-pointer">{text}</Button>
      {/* <Button size="icon" aria-label="Submit" variant="outline" className="cursor-pointer"> */}
      <Button size="icon" aria-label="Submit" className="cursor-pointer">
        <ArrowUpRightIcon />
      </Button>
    </div>
    </Link>
  );
};

export default RedirectButton;
