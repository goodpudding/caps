const { handlePickup } = require('./handler');

const mockCaps = {
  emit: jest.fn(),
};

const mockPayload = {
  store: '1-800-flowers',
  orderId: '1234',
  customer: 'John Doe',
  address: '123 Main St',
};

const incompletePayload = {
  store: '1-800-flowers',
  orderId: '1234',
  customer: '',
  address: '',
};

describe('driver handler tests', () => {
  beforeEach(() => {
    mockCaps.emit.mockClear();
  });

  test('handlePickup should emit in-transit and delivered events', () => {
    handlePickup(mockPayload);
    expect(mockCaps.emit).toHaveBeenCalledWith('in-transit', mockPayload);
    expect(mockCaps.emit).toHaveBeenCalledWith('delivered', mockPayload);
  });

  test('handlePickup should not emit events if payload is incomplete', () => {
    handlePickup(incompletePayload);
    expect(mockCaps.emit).not.toHaveBeenCalled();
  });

  test('handlePickup should not emit events if caps or payload are not provided', () => {
    handlePickup(null, mockPayload);
    expect(mockCaps.emit).not.toHaveBeenCalled();

    handlePickup(mockCaps, null);
    expect(mockCaps.emit).not.toHaveBeenCalled();

    handlePickup(null, null);
    expect(mockCaps.emit).not.toHaveBeenCalled();
  });

});
