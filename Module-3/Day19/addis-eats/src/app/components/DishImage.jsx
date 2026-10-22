import Image from "next/image";

// width and height are the ASPECT RATIO (they reserve space), not the display size.
// sizes tells the browser how wide it will really be shown.
export default function DishImage({
  src,
  alt,
  width = 400,
  height = 300,
  sizes,
  priority = false,
  className,
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}