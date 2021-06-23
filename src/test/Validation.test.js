import Validation from '../validations'

describe('Validations', ()=>{
  it('should validate values', ()=>{
    expect(Validation.shouldShowError(0, "e")).toEqual(true)
    expect(Validation.shouldShowError(0, "-1")).toEqual(true)
    expect(Validation.shouldShowError(0, "1")).toEqual(false)
    expect(Validation.shouldShowError(0, "0")).toEqual(true)
    expect(Validation.shouldShowError(1, "f")).toEqual(true)
    expect(Validation.shouldShowError(1, "c")).toEqual(false)
    expect(Validation.shouldShowError(2, "c")).toEqual(true)
    expect(Validation.shouldShowError(2, true)).toEqual(false)
  }) 
})