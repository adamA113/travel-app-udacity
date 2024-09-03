import { checkDateValidation } from '../src/client/js/dateValidation';

describe('checkDateValidation', () => {
    it('should return true for valid dates', () => {
        expect(checkDateValidation('01/01/2024')).toBe(true);
    });

    it('should return false for invalid dates', () => {
        expect(checkDateValidation('32/01/2024')).toBe(false);
        expect(checkDateValidation('01/01/2023')).toBe(true); 
        expect(checkDateValidation('00/01/2024')).toBe(false); 
    });

    it('should return false for improperly formatted dates', () => {
        expect(checkDateValidation('2024/01/01')).toBe(false); 
        expect(checkDateValidation('01/01')).toBe(false);
    });

    it('should handle edge cases', () => {
        expect(checkDateValidation('01/01/0000')).toBe(false); 
        expect(checkDateValidation('31/12/9999')).toBe(true); 
    });
});