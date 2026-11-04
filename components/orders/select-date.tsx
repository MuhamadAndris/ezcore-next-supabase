import { IconChevronDown } from "@tabler/icons-react"
import { Calendar } from "../ui/calendar"
import { Field, FieldLabel } from "../ui/field"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { formatDate } from "@/lib/utils"
import { memo } from "react"

interface SelectDateProps {
    showCalender: boolean
    setShowCalender: (v: boolean) => void
    purchasedAt: Date
    updatePurchasedAt: (newPurchasedAt: Date) => void
}

const SelectDate = memo(
    ({
        showCalender,
        setShowCalender,
        purchasedAt,
        updatePurchasedAt,
    }: SelectDateProps) => {
        console.log("render select date")
        return (
            <Field>
                <FieldLabel htmlFor="date">Tanggal</FieldLabel>
                <Popover open={showCalender} onOpenChange={setShowCalender}>
                    <PopoverTrigger
                        id="date"
                        render={
                            <Button
                                variant={"outline"}
                                className="w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                            >
                                {purchasedAt ? (
                                    formatDate(purchasedAt)
                                ) : (
                                    <span>Pilih tanggal</span>
                                )}
                                <IconChevronDown data-icon="inline-end" />
                            </Button>
                        }
                    />
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={purchasedAt}
                            onSelect={(date) => {
                                if (!date) return

                                updatePurchasedAt(date)
                                setShowCalender(false)
                            }}
                            month={purchasedAt}
                        />
                    </PopoverContent>
                </Popover>
            </Field>
        )
    }
)

export default SelectDate
