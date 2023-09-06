import { render, screen } from "@testing-library/react"
import user from "@testing-library/user-event"
import UserForm from "./UserForm"

test("it shows 2 input and a button", () => {
  render(<UserForm />)

  const inputs = screen.getAllByRole("textbox")
  const button = screen.getByRole("button")

  expect(inputs).toHaveLength(2)
  expect(button).toBeInTheDocument()
})

test("it calls onUserAdd when the form is submitted", () => {
  const mock = jest.fn()

  render(<UserForm onUserAdd={mock} />)

  const nameInput = screen.getByRole("textbox", {
    name: /name/i,
  })
  const emailInput = screen.getByRole("textbox", {
    name: /email/i,
  })

  user.click(nameInput)
  user.keyboard("jane")

  user.click(emailInput)
  user.keyboard("jane@jane.com")

  const button = screen.getByRole("button")
  user.click(button)

  expect(mock).toHaveBeenCalled()
  expect(mock).toHaveBeenCalledWith({ name: "jane", email: "jane@jane.com" })
})

test("empties the two inputs after form is submitted", () => {
  render(<UserForm onUserAdd={() => {}} />)

  const nameInput = screen.getByRole("textbox", { name: /name/i })
  const emailInput = screen.getByRole("textbox", { name: /email/i })
  const button = screen.getByRole("button")

  user.click(nameInput)
  user.keyboard("jane")
  user.click(emailInput)
  user.keyboard("jane@jane.com")

  user.click(button)

  expect(nameInput).toHaveValue("")
  expect(emailInput).toHaveValue("")
})
