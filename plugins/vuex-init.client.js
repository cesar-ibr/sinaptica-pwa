export default async (context) => {
  await context.store.dispatch('vuexClientInit', context);
};
