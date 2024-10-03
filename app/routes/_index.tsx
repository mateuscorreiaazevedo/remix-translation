import type {MetaFunction} from "@remix-run/node";
import {useTranslation} from "~/shared/hooks/translation";

export const meta: MetaFunction = () => {
  return [
    {title: "New Remix App"},
    {name: "description", content: "Welcome to Remix!"},
  ];
};

export default function AppLayout() {
  const {translate, translateOptions} = useTranslation()
  return (
    <>
      <header className={'flex items-center justify-center h-20'}>
        <h1>{translate('commons.title')}</h1>
      </header>
      <main className={'flex items-center justify-center w-full'}>
        {translateOptions('commons.tabs').map(item => <pre>{item.label}</pre>)}
      </main>
    </>
  );
}

