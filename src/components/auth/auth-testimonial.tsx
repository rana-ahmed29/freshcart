import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import ReviewAuthor from "@/assets/images/review-author.webp";

export default function AuthTestimonial() {
  return (
    <div className="rounded-md bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center gap-4">
        <Image
          src={ReviewAuthor}
          alt="Sarah Johnson"
          className="size-12 rounded-full object-cover"
        />
        <div>
          <h3 className="font-medium">Sarah Johnson</h3>
          <div className="flex gap-0.5 text-yellow-300">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>
        </div>
      </div>

      <blockquote>
        <p className="italic text-gray-600">
          &ldquo;FreshCart has transformed my shopping experience. The quality
          of the products is outstanding, and the delivery is always on time.
          Highly recommend!&rdquo;
        </p>
      </blockquote>
    </div>
  );
}
