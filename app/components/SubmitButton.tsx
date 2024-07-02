import SVGSpinner from "./SVG/SVGSpinner";

export default function SubmitButton({ isLoading, text }: { isLoading: boolean, text: string }) {
  return (
    <button
      type="submit"
      className="btn flex justify-center"
      disabled={isLoading}>
      {isLoading ? <SVGSpinner /> : text}
    </button>
  )
}
