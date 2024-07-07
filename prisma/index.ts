import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
	return new PrismaClient({
		log: ['error'],
		errorFormat: 'pretty',
	});
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
	prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

prisma.$use(async (params, next) => {
	const before = Date.now();

	const result = await next(params);

	const after = Date.now();

	console.log(
		`Query ${params.model}.${params.action} took ${after - before}ms`
	);

	return result;
});
export default prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
