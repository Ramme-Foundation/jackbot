import { createSections } from "./formatCustomInput"

describe('#createSections', () => {
  it('creates correct number of sections for odd numbers', () => {
    const sections = createSections(5, 12, "bonus")
    expect(sections.length).toBe(3)
    expect(sections[0].elements.length).toBe(5)
    expect(sections[1].elements.length).toBe(5)
    expect(sections[2].elements.length).toBe(2)
  })
})