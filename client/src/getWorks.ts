import { Work, WorksList } from './interfaces/Works';

const NUM_WORKS = 10;

export const getWorks = async (isPopularWork: boolean) => {
  const works: WorksList = [];

  let popularWork = '0';
  if (isPopularWork) popularWork = '1';

  const params = {
    popWork: popularWork,
  };

  const res = await fetch(
    `/get-works?` + new URLSearchParams(params).toString()
  );
  const body = await res.json();
  const data = body['works'];

  console.log(data);

  const composerIds: string[] = [];

  // Paginate first 10 to make less api calls when 'load more'
  for (let i = 0; i < NUM_WORKS; i++) {
    const composerId = data[i]['composer']['id'];
    composerIds.push(composerId);
  }

  const composers = await getComposerData(composerIds);

  console.log(composers);

  for (let i = 0; i < NUM_WORKS; i++) {
    console.log();

    const composer = composers.find(
      (e: { [x: string]: any }) => e['id'] === data[i]['composer']['id']
    );

    console.log(composer);

    const work: Work = {
      id: data[i]['id'],
      title: data[i]['title'],
      genre: data[i]['genre'],
      composer: composer,
    };

    works.push(work);
  }

  return works;
};

const getComposerData = async (composerIds: string[]) => {
  const composerData = await fetch(
    `https://api.openopus.org/composer/list/ids/${composerIds}.json`
  ).then((res) => res.json());
  return composerData['composers'];
};
