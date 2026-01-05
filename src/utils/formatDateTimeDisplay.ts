import { dateTimeDisplayFormat } from "@/config/constants"
import dayjs from "dayjs"

const formatDateTimeDisplay = (dateTime: string) => {
  return dayjs(dateTime).format(dateTimeDisplayFormat)
}

export default formatDateTimeDisplay
