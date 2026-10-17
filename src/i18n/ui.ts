export const languages = {
	en: 'English',
	es: 'Español',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'en';

const en = {
	'site.title': 'Daniel León — Frontend Developer & Systems Engineer',
	'site.description':
		'Portfolio of Daniel Alejandro León Ortiz, a frontend developer and systems engineer building modern, performant web experiences.',
	'skip.link': 'Skip to content',

	'nav.label': 'Primary',
	'nav.menu': 'menu',
	'nav.about': 'about',
	'nav.now': 'now',
	'nav.experience': 'experience',
	'nav.projects': 'projects',
	'nav.skills': 'skills',
	'nav.lab': 'lab',
	'nav.education': 'education',
	'nav.contact': 'contact',
	'lang.label': 'Language',
	'lang.switch': 'Leer en español',

	'hero.role': 'Frontend Developer & Systems Engineer',
	'hero.tagline':
		'I build fast, accessible interfaces and like knowing how things work — from the browser down to the server.',
	'hero.cta.contact': './get-in-touch',
	'hero.cta.cv': './get-cv --lang=en',
	'hero.logo.label': 'dalo.dev logo rendered in ASCII characters',

	'status.label': 'Quick facts',
	'status.uptime': 'uptime',
	'status.uptime.value': 'frontend since 2022',
	'status.users': 'users',
	'status.users.value': '20,000+ students / semester',
	'status.honors': 'honors',
	'status.honors.value': 'Cum Laude',
	'status.loc': 'loc',
	'status.loc.value': 'Colombia',

	'about.title': 'About',
	'about.p1':
		"I'm Daniel Alejandro León Ortiz, a Systems Engineer (Cum Laude, Universidad Industrial de Santander) who builds web interfaces with React, Angular and TypeScript. At DTIC UIS I build and maintain the university's admissions frontend, used by 20,000+ applicants every semester, along with reusable Angular Material components shared across institutional modules.",
	'about.p2':
		'I care about the details people feel but rarely notice: accessibility, performance, and interfaces that behave predictably. I write tests, keep components small and reusable, and use AI tools to move faster — while making sure I understand every line I ship.',
	'about.p3':
		'Outside of work, Linux is my daily driver and I tinker with a small homelab — it keeps me curious about what happens below the browser.',
	'about.photo.alt': 'Portrait of Daniel León',
	'about.languages': 'Languages',
	'lang.spanish': 'Spanish',
	'lang.english': 'English',
	'lang.native': 'native',
	'lang.professional': 'professional working proficiency',
	'now.title': 'Now',
	'now.updated': 'last updated',
	'experience.title': 'Experience',
	'experience.present': 'present',
	'experience.stack': 'Tech stack',
	'projects.title': 'Projects',
	'projects.source': 'source',
	'projects.live': 'live',
	'projects.stack': 'Tech stack',
	'skills.title': 'Skills',
	'skills.core': 'core',
	'skills.frameworks-and-libraries': 'frameworks-and-libraries',
	'skills.styling-and-ui': 'styling-and-ui',
	'skills.tooling-and-testing': 'tooling-and-testing',
	'skills.linux-and-self-hosting': 'linux-and-self-hosting',
	'skills.ai-tools': 'ai-tools',
	'lab.title': 'The lab',
	'lab.services': 'Services',
	'education.title': 'Education',
	'education.gpa': 'gpa',
	'education.honors': 'honors',
	'contact.title': 'Get in touch',
	'contact.subtitle': 'Have a project in mind or just want to say hi? Feel free to reach out.',
	'contact.connecting': 'connecting…',
	'contact.ok': 'ok',
	'contact.cv': 'Download CV',

	'footer.rights': 'All rights reserved.',
	'footer.mode': 'NORMAL',
	'footer.top': 'cd /top',
	'footer.top.label': 'back to top',
	'social.email': 'Email',

	'motion.pause': 'pause animations',
	'boot.skip': 'Skip intro',
	'boot.hint': 'press any key',

	'notFound.title': 'Page not found',
	'notFound.message': 'No such file or directory',
	'notFound.hint': 'The page you are looking for does not exist or was moved.',
	'notFound.home': 'cd ~',
} as const;

export type UIKey = keyof typeof en;

const es: Record<UIKey, string> = {
	'site.title': 'Daniel León — Desarrollador Frontend e Ingeniero de Sistemas',
	'site.description':
		'Portafolio de Daniel Alejandro León Ortiz, desarrollador frontend e ingeniero de sistemas que construye experiencias web modernas y eficientes.',
	'skip.link': 'Saltar al contenido',

	'nav.label': 'Principal',
	'nav.menu': 'menú',
	'nav.about': 'sobre-mi',
	'nav.now': 'ahora',
	'nav.experience': 'experiencia',
	'nav.projects': 'proyectos',
	'nav.skills': 'habilidades',
	'nav.lab': 'lab',
	'nav.education': 'educacion',
	'nav.contact': 'contacto',
	'lang.label': 'Idioma',
	'lang.switch': 'Read in English',

	'hero.role': 'Desarrollador Frontend & Ingeniero de Sistemas',
	'hero.tagline':
		'Construyo interfaces rápidas y accesibles, y me gusta entender cómo funcionan las cosas — desde el navegador hasta el servidor.',
	'hero.cta.contact': './contactame',
	'hero.cta.cv': './get-cv --lang=es',
	'hero.logo.label': 'Logo de dalo.dev dibujado con caracteres ASCII',

	'status.label': 'Datos rápidos',
	'status.uptime': 'uptime',
	'status.uptime.value': 'frontend desde 2022',
	'status.users': 'usuarios',
	'status.users.value': '20.000+ estudiantes / semestre',
	'status.honors': 'distinción',
	'status.honors.value': 'Cum Laude',
	'status.loc': 'loc',
	'status.loc.value': 'Colombia',

	'about.title': 'Sobre mí',
	'about.p1':
		'Soy Daniel Alejandro León Ortiz, Ingeniero de Sistemas (Cum Laude, Universidad Industrial de Santander) y construyo interfaces web con React, Angular y TypeScript. En la DTIC UIS desarrollo y mantengo el frontend de admisiones de la universidad, que usan más de 20.000 aspirantes cada semestre, junto con componentes reutilizables de Angular Material compartidos entre módulos institucionales.',
	'about.p2':
		'Me importan los detalles que las personas sienten aunque rara vez notan: accesibilidad, rendimiento e interfaces que se comportan de forma predecible. Escribo pruebas, mantengo los componentes pequeños y reutilizables, y uso herramientas de IA para avanzar más rápido, asegurándome de entender cada línea que entrego.',
	'about.p3':
		'Fuera del trabajo, Linux es mi sistema de uso diario y experimento con un pequeño homelab: me mantiene curioso por lo que pasa debajo del navegador.',
	'about.photo.alt': 'Retrato de Daniel León',
	'about.languages': 'Idiomas',
	'lang.spanish': 'Español',
	'lang.english': 'Inglés',
	'lang.native': 'nativo',
	'lang.professional': 'competencia profesional',
	'now.title': 'Ahora',
	'now.updated': 'última actualización',
	'experience.title': 'Experiencia',
	'experience.present': 'presente',
	'experience.stack': 'Tecnologías',
	'projects.title': 'Proyectos',
	'projects.source': 'código',
	'projects.live': 'demo',
	'projects.stack': 'Tecnologías',
	'skills.title': 'Habilidades',
	'skills.core': 'base',
	'skills.frameworks-and-libraries': 'frameworks-y-librerias',
	'skills.styling-and-ui': 'estilos-y-ui',
	'skills.tooling-and-testing': 'herramientas-y-testing',
	'skills.linux-and-self-hosting': 'linux-y-self-hosting',
	'skills.ai-tools': 'herramientas-ia',
	'lab.title': 'El laboratorio',
	'lab.services': 'Servicios',
	'education.title': 'Educación',
	'education.gpa': 'promedio',
	'education.honors': 'distinción',
	'contact.title': 'Contacto',
	'contact.subtitle':
		'¿Tienes un proyecto en mente o simplemente quieres saludar? No dudes en escribirme.',
	'contact.connecting': 'conectando…',
	'contact.ok': 'ok',
	'contact.cv': 'Descargar CV',

	'footer.rights': 'Todos los derechos reservados.',
	'footer.mode': 'NORMAL',
	'footer.top': 'cd /top',
	'footer.top.label': 'volver arriba',
	'social.email': 'Correo',

	'motion.pause': 'pausar animaciones',
	'boot.skip': 'Saltar intro',
	'boot.hint': 'presiona cualquier tecla',

	'notFound.title': 'Página no encontrada',
	'notFound.message': 'No existe el archivo o directorio',
	'notFound.hint': 'La página que buscas no existe o fue movida.',
	'notFound.home': 'cd ~',
};

export const ui: Record<Lang, Record<UIKey, string>> = { en, es };
