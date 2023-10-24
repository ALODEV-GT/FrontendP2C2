import { CodeModel } from '@ngstack/code-editor/public_api';

export enum FileNodeType {
  file = 'file',
  folder = 'folder'
}

export interface FileNode {
  children?: FileNode[]
  name: string
  type: FileNodeType
  code?: CodeModel;
}
