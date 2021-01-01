import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';
import AppError from '@shared/errors/appError';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 8, 0, 0),
      provider_id: '123123123',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 10, 0, 0),
      provider_id: '123123123',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 21, 8, 0, 0),
      provider_id: '123123123',
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: '123123123',
      year: 2020,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, availability: true },
        { day: 20, availability: false },
        { day: 21, availability: false },
        { day: 22, availability: true },
      ]),
    );
  });
});
