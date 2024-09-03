import { checkDateRange } from '../src/client/js/dateRangeValidation';

describe('checkDateRange', () => {
    it('should return false for improperly formatted dates', () => {
        expect(checkDateRange('2024/01/01')).toBe(false);
        expect(checkDateRange('01-01-2024')).toBe(false); 
        expect(checkDateRange('01/01/24')).toBe(false); 
        expect(checkDateRange('01/01')).toBe(false);
        expect(checkDateRange('01/2024')).toBe(false); 
    });
});