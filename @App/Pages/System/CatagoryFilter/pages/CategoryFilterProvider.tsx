import { useCorePageContext } from "@/@App/Core/hooks/useAppContext"
import { CorePageProvider } from "@/@App/Core/provider/CorePageProvider"
import { ReactNode } from "react"
import {useCategoryFilterModal} from "../hooks/useCategoryFilterModal"
interface CategoryFilterProps {
    children: ReactNode
}
const CategoryFilterProvider: React.FC<CategoryFilterProps> = (props)=>{
    const {renderModal, handleOpen} = useCategoryFilterModal()
    const {children, ...resProps} = props

    const data = {
        handleOpen,

        ...resProps
    }
    return (
        <CorePageProvider {...data}>
        {children} {renderModal()}
        </CorePageProvider>
    )
}
export default CategoryFilterProvider