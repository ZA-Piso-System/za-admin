import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import debounce from "debounce"
import { CircleXIcon } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
  type ChangeEvent,
  type InputHTMLAttributes,
  useEffect,
  useMemo,
  useState,
} from "react"

type Props = InputHTMLAttributes<HTMLInputElement> & {
  searchKey: string
}

export const SearchInput = ({ searchKey, className, ...rest }: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [inputValue, setInputValue] = useState("")

  useEffect(() => {
    setInputValue(searchParams.get(searchKey) ?? "")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(window.location.search)
    if (value) {
      params.set(searchKey, value)
    } else {
      params.delete(searchKey)
    }
    router.push(pathname + "?" + params.toString())
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useMemo(() => debounce(handleSearch, 500), [])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    debouncedSearch(newValue)
  }

  const handleClearInput = () => {
    setInputValue("")
    handleSearch("")
  }

  return (
    <div className="relative">
      <Input
        value={inputValue}
        onChange={handleChange}
        className={cn("pe-9", className)}
        {...rest}
      />
      {inputValue && (
        <button
          className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 transition-[color,box-shadow] outline-none hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Clear input"
          onClick={handleClearInput}
        >
          <CircleXIcon size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
