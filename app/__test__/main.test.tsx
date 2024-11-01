import { expect, test} from "vitest"
import { fireEvent, render, screen }from "@testing-library/react"
import StoreProvider from "../StoreProvider"
import Main from "../component/Main"

test("input bar exist", async()=>{
    render(
        <StoreProvider>
        <Main></Main>
        </StoreProvider>
)
    const inputBar:HTMLInputElement = await screen.findByPlaceholderText("Type in your todo list")
    expect(inputBar).toBeDefined()
})

test("calls onChange handler when text is typed", async()=>{
    render(
        <StoreProvider>
            <Main></Main>
        </StoreProvider>
    )
    const inputBar:HTMLInputElement = await screen.findByPlaceholderText("Type in your todo list")
    expect(inputBar).toBeDefined()
    fireEvent.change(inputBar, {target:{ value: "New Todo Item"}})
    expect(inputBar.value).toBe("New Todo Item")
})

