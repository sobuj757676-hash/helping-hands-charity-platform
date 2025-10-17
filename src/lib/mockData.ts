import { faker } from '@faker-js/faker';
import { 
  User, 
  Event, 
  Donation, 
  Aid, 
  Message, 
  BlogPost, 
  DashboardStats,
  EventType,
  AidType,
  PaymentMethod
} from '@/types';

// Generate mock volunteers
export const generateMockVolunteers = (count: number = 20): User[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: `volunteer-${index + 1}`,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    avatar: faker.image.avatar(),
    role: 'volunteer' as const,
    status: faker.helpers.arrayElement(['active', 'inactive', 'pending']),
    createdAt: faker.date.past({ years: 2 }).toISOString(),
    updatedAt: faker.date.recent().toISOString()
  }));
};

// Generate mock donors
export const generateMockDonors = (count: number = 30): User[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: `donor-${index + 1}`,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    avatar: faker.image.avatar(),
    role: 'donor' as const,
    status: 'active',
    createdAt: faker.date.past({ years: 3 }).toISOString(),
    updatedAt: faker.date.recent().toISOString()
  }));
};

// Generate mock beneficiaries
export const generateMockBeneficiaries = (count: number = 50): User[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: `beneficiary-${index + 1}`,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    avatar: faker.image.avatar(),
    role: 'beneficiary' as const,
    status: faker.helpers.arrayElement(['active', 'pending']),
    createdAt: faker.date.past({ years: 2 }).toISOString(),
    updatedAt: faker.date.recent().toISOString()
  }));
};

// Generate mock events
export const generateMockEvents = (count: number = 15): Event[] => {
  const eventTypes: EventType[] = ['food_distribution', 'medical_camp', 'education', 'clothing', 'emergency', 'training'];
  const eventTitles = {
    food_distribution: ['Community Food Drive', 'Emergency Food Relief', 'Weekly Food Distribution'],
    medical_camp: ['Free Health Checkup', 'Vaccination Camp', 'Eye Care Camp'],
    education: ['School Supply Drive', 'Digital Literacy Workshop', 'Scholarship Program'],
    clothing: ['Winter Clothing Drive', 'School Uniform Distribution', 'Warm Clothes for Homeless'],
    emergency: ['Flood Relief Operation', 'Emergency Medical Aid', 'Disaster Response'],
    training: ['Volunteer Training', 'First Aid Workshop', 'Leadership Development']
  };

  return Array.from({ length: count }, (_, index) => {
    const type = faker.helpers.arrayElement(eventTypes);
    const title = faker.helpers.arrayElement(eventTitles[type]);
    const startDate = faker.date.future();
    const endDate = new Date(startDate.getTime() + faker.number.int({ min: 2, max: 24 }) * 60 * 60 * 1000);

    return {
      id: `event-${index + 1}`,
      title,
      description: faker.lorem.paragraphs(2),
      type,
      status: faker.helpers.arrayElement(['draft', 'published', 'ongoing', 'completed']),
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      location: `${faker.location.streetAddress()}, ${faker.location.city()}`,
      maxVolunteers: faker.number.int({ min: 10, max: 50 }),
      registeredVolunteers: faker.number.int({ min: 0, max: 30 }),
      requiredSkills: faker.helpers.arrayElements(
        ['Communication', 'Leadership', 'Medical Knowledge', 'Teaching', 'Physical Strength', 'Cooking'],
        { min: 1, max: 3 }
      ),
      organizer: faker.person.fullName(),
      budget: faker.number.int({ min: 5000, max: 100000 }),
      image: faker.image.url({ width: 800, height: 400 }),
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent().toISOString()
    };
  });
};

// Generate mock donations
export const generateMockDonations = (count: number = 100): Donation[] => {
  const paymentMethods: PaymentMethod[] = ['cash', 'bank_transfer', 'mobile_banking', 'card'];
  const purposes = ['General Fund', 'Education Support', 'Medical Aid', 'Food Distribution', 'Emergency Relief', 'Infrastructure'];

  return Array.from({ length: count }, (_, index) => ({
    id: `donation-${index + 1}`,
    donorId: `donor-${faker.number.int({ min: 1, max: 30 })}`,
    amount: faker.number.int({ min: 100, max: 50000 }),
    currency: 'BDT',
    method: faker.helpers.arrayElement(paymentMethods),
    status: faker.helpers.arrayElement(['pending', 'completed', 'failed']),
    purpose: faker.helpers.arrayElement(purposes),
    campaign: faker.helpers.maybe(() => faker.lorem.words(2)),
    isAnonymous: faker.datatype.boolean(),
    isRecurring: faker.datatype.boolean(),
    recurringFrequency: faker.helpers.maybe(() => faker.helpers.arrayElement(['monthly', 'quarterly', 'yearly'])),
    transactionId: faker.string.alphanumeric(12).toUpperCase(),
    receiptNumber: `RC-${faker.string.numeric(8)}`,
    createdAt: faker.date.past({ years: 1 }).toISOString(),
    processedAt: faker.helpers.maybe(() => faker.date.recent().toISOString())
  }));
};

// Generate mock aid records
export const generateMockAid = (count: number = 75): Aid[] => {
  const aidTypes: AidType[] = ['food', 'clothing', 'medical', 'education', 'financial', 'emergency'];
  const descriptions = {
    food: ['Monthly food package', 'Rice and lentils', 'Fresh vegetables', 'Emergency food supply'],
    clothing: ['Winter clothes', 'School uniforms', 'Baby clothes', 'Work clothes'],
    medical: ['Medicine for diabetes', 'Eye glasses', 'Wheelchair', 'Medical checkup'],
    education: ['School books', 'Laptop for studies', 'School fees', 'Stationery'],
    financial: ['Emergency cash', 'Rent assistance', 'Medical expenses', 'Business loan'],
    emergency: ['Flood relief', 'Fire damage support', 'Medical emergency', 'Shelter repair']
  };

  return Array.from({ length: count }, (_, index) => {
    const type = faker.helpers.arrayElement(aidTypes);
    const requestedAt = faker.date.past();
    const status = faker.helpers.arrayElement(['requested', 'approved', 'distributed', 'rejected']);
    
    return {
      id: `aid-${index + 1}`,
      beneficiaryId: `beneficiary-${faker.number.int({ min: 1, max: 50 })}`,
      type,
      status,
      description: faker.helpers.arrayElement(descriptions[type]),
      quantity: faker.number.int({ min: 1, max: 10 }),
      value: faker.number.int({ min: 500, max: 25000 }),
      requestedAt: requestedAt.toISOString(),
      approvedAt: status !== 'requested' ? faker.date.between({ from: requestedAt, to: new Date() }).toISOString() : undefined,
      distributedAt: status === 'distributed' ? faker.date.recent().toISOString() : undefined,
      approvedBy: status !== 'requested' ? 'admin-1' : undefined,
      distributedBy: status === 'distributed' ? `volunteer-${faker.number.int({ min: 1, max: 20 })}` : undefined,
      notes: faker.helpers.maybe(() => faker.lorem.sentence())
    };
  });
};

// Generate mock messages
export const generateMockMessages = (count: number = 25): Message[] => {
  const subjects = [
    'Volunteer Application',
    'Donation Inquiry',
    'Event Information',
    'Partnership Proposal',
    'General Inquiry',
    'Feedback',
    'Complaint',
    'Suggestion'
  ];

  return Array.from({ length: count }, (_, index) => ({
    id: `message-${index + 1}`,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.helpers.maybe(() => faker.phone.number()),
    subject: faker.helpers.arrayElement(subjects),
    message: faker.lorem.paragraphs(faker.number.int({ min: 1, max: 3 })),
    status: faker.helpers.arrayElement(['unread', 'read', 'replied']),
    createdAt: faker.date.past({ months: 6 }).toISOString(),
    repliedAt: faker.helpers.maybe(() => faker.date.recent().toISOString())
  }));
};

// Generate mock blog posts
export const generateMockBlogPosts = (count: number = 20): BlogPost[] => {
  const titles = [
    'Making a Difference: Our Latest Community Project',
    'How Your Donations Transform Lives',
    'Volunteer Spotlight: Meet Our Amazing Team',
    'The Impact of Education Support Programs',
    'Emergency Relief: Responding to Community Needs',
    'Building Stronger Communities Together',
    'Success Stories from Our Beneficiaries',
    'The Importance of Sustainable Development'
  ];

  return Array.from({ length: count }, (_, index) => {
    const title = faker.helpers.arrayElement(titles);
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    
    return {
      id: `post-${index + 1}`,
      title,
      slug: `${slug}-${index + 1}`,
      excerpt: faker.lorem.paragraph(),
      content: faker.lorem.paragraphs(faker.number.int({ min: 3, max: 8 })),
      image: faker.image.url({ width: 800, height: 400 }),
      author: faker.person.fullName(),
      status: faker.helpers.arrayElement(['draft', 'published']),
      tags: faker.helpers.arrayElements(
        ['Community', 'Volunteering', 'Donations', 'Education', 'Health', 'Emergency', 'Success Story'],
        { min: 1, max: 4 }
      ),
      publishedAt: faker.helpers.maybe(() => faker.date.past().toISOString()),
      createdAt: faker.date.past({ months: 12 }).toISOString(),
      updatedAt: faker.date.recent().toISOString()
    };
  });
};

// Generate dashboard statistics
export const generateDashboardStats = (): DashboardStats => ({
  totalFamiliesHelped: faker.number.int({ min: 500, max: 2000 }),
  activeVolunteers: faker.number.int({ min: 50, max: 200 }),
  totalDonations: faker.number.int({ min: 100000, max: 5000000 }),
  upcomingEvents: faker.number.int({ min: 3, max: 15 }),
  totalUsers: faker.number.int({ min: 500, max: 2000 }),
  thisMonthDonations: faker.number.int({ min: 10000, max: 500000 }),
  totalAidDistributed: faker.number.int({ min: 1000, max: 10000 }),
  averageDonation: faker.number.int({ min: 500, max: 5000 })
});

// Create mock data store
export const mockData = {
  volunteers: generateMockVolunteers(),
  donors: generateMockDonors(),
  beneficiaries: generateMockBeneficiaries(),
  events: generateMockEvents(),
  donations: generateMockDonations(),
  aid: generateMockAid(),
  messages: generateMockMessages(),
  blogPosts: generateMockBlogPosts(),
  stats: generateDashboardStats()
};