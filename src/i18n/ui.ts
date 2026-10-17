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
	'hero.tagline': 'Building modern, performant web experiences with clean code and great design.',
	'hero.cta.contact': './get-in-touch',
	'hero.cta.cv': './get-cv --lang=en',
	'hero.logo.label': 'dalo.dev logo rendered in ASCII characters',

	'status.label': 'Quick facts',
	'status.uptime': 'uptime',
	'status.uptime.value': 'shipping frontend since 2022',
	'status.loc': 'loc',
	'status.loc.value': 'Colombia',
	'status.langs': 'langs',
	'status.langs.value': 'es · en',

	'about.title': 'About',
	'about.p1':
		"I'm Daniel Alejandro León Ortiz, a Systems Engineer focused on building scalable web applications that balance architectural integrity with high-performance user experiences. I approach frontend development with a rigorous engineering mindset, prioritizing maintainable code, comprehensive testing, and sustainable component structures.",
	'about.p2':
		'I specialize in translating complex business requirements into intuitive digital solutions while maintaining a quality-first approach throughout the software development lifecycle. I thrive in agile environments where technical excellence and system reliability are the core priorities.',
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
		'Construyendo experiencias web modernas y eficientes con código limpio y buen diseño.',
	'hero.cta.contact': './contactame',
	'hero.cta.cv': './get-cv --lang=es',
	'hero.logo.label': 'Logo de dalo.dev dibujado con caracteres ASCII',

	'status.label': 'Datos rápidos',
	'status.uptime': 'uptime',
	'status.uptime.value': 'construyendo frontend desde 2022',
	'status.loc': 'loc',
	'status.loc.value': 'Colombia',
	'status.langs': 'idiomas',
	'status.langs.value': 'es · en',

	'about.title': 'Sobre mí',
	'about.p1':
		'Soy Daniel Alejandro León Ortiz, Ingeniero de Sistemas enfocado en construir aplicaciones web escalables que equilibran la integridad arquitectónica con experiencias de usuario de alto rendimiento. Abordo el desarrollo frontend con una mentalidad de ingeniería rigurosa, priorizando código mantenible, pruebas exhaustivas y estructuras de componentes sostenibles.',
	'about.p2':
		'Me especializo en traducir requisitos de negocio complejos en soluciones digitales intuitivas, manteniendo un enfoque de calidad ante todo a lo largo del ciclo de vida del desarrollo de software. Prospero en entornos ágiles donde la excelencia técnica y la confiabilidad del sistema son las prioridades fundamentales.',
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

	'motion.pause': 'pausar animaciones',
	'boot.skip': 'Saltar intro',
	'boot.hint': 'presiona cualquier tecla',

	'notFound.title': 'Página no encontrada',
	'notFound.message': 'No existe el archivo o directorio',
	'notFound.hint': 'La página que buscas no existe o fue movida.',
	'notFound.home': 'cd ~',
};

export const ui: Record<Lang, Record<UIKey, string>> = { en, es };
