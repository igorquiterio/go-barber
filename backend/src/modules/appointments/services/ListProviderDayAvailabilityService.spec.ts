import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';
import AppError from '@shared/errors/appError';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the day availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 8, 0, 0),
      provider_id: '123123123',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 10, 0, 0),
      provider_id: '123123123',
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: '123123123',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: true },
        { hour: 10, available: false },
        { hour: 11, available: true },
      ]),
    );
  });
});
