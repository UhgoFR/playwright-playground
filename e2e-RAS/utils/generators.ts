export function getRandomUser(): {
  firstName: string;
  lastName: string;
  email: string;
  photoUrl: string;
} {
  const firstNames = [
    'Juan', 'Ana', 'Luis', 'Maria', 'Carlos', 'Lucia',
    'Pedro', 'Sofia', 'Jorge', 'Camila', 'Fernando', 'Valentina',
    'Diego', 'Isabel', 'Andres', 'Daniela', 'Ricardo', 'Paula',
    'Jose', 'Alejandra', 'Hector', 'Renata', 'Raul', 'Elena',
    'Miguel', 'Veronica', 'Santiago', 'Adriana', 'David', 'Monserrat'
  ];

  const lastNames = [
    'Gomez', 'Hernandez', 'Martinez', 'Perez', 'Rodriguez',
    'Lopez', 'Ramirez', 'Sanchez', 'Torres', 'Cruz', 'Flores',
    'Vargas', 'Castillo', 'Morales', 'Ortiz', 'Reyes', 'Navarro',
    'Dominguez', 'Herrera', 'Mendoza', 'Ramos', 'Chavez', 'Aguilar',
    'Silva', 'Medina', 'Delgado', 'Cortes', 'Fuentes', 'Serrano', 'Acosta'
  ];

  const photoUrls = [
    'https://i.pravatar.cc/150?img=3',
    'https://i.pravatar.cc/150?img=15',
    'https://i.pravatar.cc/150?img=25',
    'https://i.pravatar.cc/150?img=45',
    'https://picsum.photos/200',
    'https://placekitten.com/200/200',
    'https://placebear.com/200/200',
    'https://randomuser.me/api/portraits/men/75.jpg',
    'https://randomuser.me/api/portraits/women/65.jpg'
  ];

  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const photoUrl = photoUrls[Math.floor(Math.random() * photoUrls.length)];

  const randomNum = Math.floor(Math.random() * 1000);
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${randomNum}@mail.com`;

  return { firstName, lastName, email, photoUrl };
}

export function getDateForDay(dayIndex: number, weeksAhead: number = 0): string {
  const today = new Date();
  const todayIndex = today.getDay();

  let daysToAdd = (dayIndex - todayIndex + 7) % 7;
  daysToAdd += weeksAhead * 7;

  const result = new Date();
  result.setDate(today.getDate() + daysToAdd);

  return result.toISOString().split('T')[0];
}

export function getCurrentMonthName(): string {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentMonthIndex = new Date().getMonth(); 
  return monthNames[currentMonthIndex];
}

