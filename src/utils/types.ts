import { localeNames } from '../locales';

export type LocaleNames = typeof localeNames;

export type LocaleName = LocaleNames[number];

export type LocaleString = Record<LocaleName, string>;

export interface Object<T extends string> {
  _type: T;
}

export interface Document<T extends string> extends Object<T> {
  _id: string;
}

export interface Ref {
  _type: 'ref';
  _ref: string;
}

export interface Category extends Document<'shopping.category'> {
  name: LocaleString;
}

export interface Item extends Document<'shopping.item'> {
  category: Ref;
  name: LocaleString;
}
