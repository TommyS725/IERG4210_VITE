import { ComponentPropsWithRef } from "react";

type Props = 
Omit<ComponentPropsWithRef<"img">, "src">
& { filename: string };

const propend = "/images/";

export function FullImage({ filename, ...props }: Props) {
  return (
    <img
      {...props}
      className={
        "  mx-h-64 lg:max-h-96 object-scale-down" +
        (props.className ? props.className : "")
      }
      src={propend + filename}
    />
  );
}

export function Thumbnail({ filename, ...props }: Props) {
  const haveClickEvent = props.onClick ? true : false;
  const classNames =
    (haveClickEvent ? "cursor-pointer hover:border-blue-500 " : "")
    + " w-24 h-24 md:h-40 md:w-40 rounded-xl  border-2 border-transparent p-1   object-scale-down" 
    + (props.className ? props.className : "");
  return (
    <img
      {...props}
      className={classNames}
      src={propend + filename}
    />
  );
}
