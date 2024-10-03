import {useMatches} from "@remix-run/react";
import {messagesTranslation} from "~/shared/i18n/messages";

type VariablesType = {
  path: string
  messages: any
  variables?: Record<string, string | number>
}


function getValueFromPath(path: string, messages: any) {
  return path?.split('.').reduce((obj, key) => obj && (obj as any)[key], messages);

}

function getValueFromPathMessages(path: string, messages: any): string {
  const result = getValueFromPath(path, messages)

  return result != null ? String(result) : path
}

function getValueFromPathMessagesIsArray(path: string, messages: any): any[] {
  const result = getValueFromPath(path, messages)

  return Array.isArray(result) ? result : [path]
}

export function getValueFromPathWithVariables({ variables, path, messages }: VariablesType) {
  if (variables) {
    const translateString = getValueFromPathMessages(path, messages)
    return translateString.replace(/\{(\w+)\}/g, (_, key) => {
      return String(variables[key]) || `{${key}}`
    })
  } else {
    return getValueFromPathMessages(path, messages)
  }
}


export function useTranslation(prefix?: string) {
  const getFullPath = (path: string) => prefix ? `${prefix}.${path}` : path
  const [{data}] = useMatches()
  const defaultLocale = (data as any).cookies.locale

  const defaultMessages = messagesTranslation[defaultLocale as string]

  function translate(path: string, values?: Record<string, any>) {
    const fullPath = getFullPath(path)

    return getValueFromPathWithVariables({
      variables: values,
      path: fullPath,
      messages: defaultMessages
    })
  }

  function translateOptions(path: string) {
    const fullPath = getFullPath(path)

    return getValueFromPathMessagesIsArray(fullPath, defaultMessages)
  }


  return {
    translate,
    translateOptions
  }
}
