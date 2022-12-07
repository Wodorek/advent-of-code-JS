import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

class Directory {
  name: string;
  size: number = 0;
  parent: Directory | null = null;
  directories: { [key: string]: Directory } = {};
  files: { [key: string]: File } = {};

  constructor(name: string, parent?: Directory) {
    this.name = name;
    if (parent) {
      this.parent = parent;
    }
  }
}

class File {
  name: string;
  size: number;
  constructor(name: string, size: number) {
    this.name = name;
    this.size = size;
  }
}

/**
 * I don't see the point of implementing 'ls' command for now
 */
class Filesystem {
  files: { [key: string]: File } = {};
  directories: Directory = new Directory('/');
  root = this.directories;
  current: Directory;

  constructor(fileList: string[][]) {
    this.current = this.directories;

    fileList.forEach((cmd) => {
      if (cmd[0] === 'ls') {
        return;
      } else if (cmd[0] === 'cd') {
        this.navigate(cmd[1]);
      } else if (cmd[0] === 'dir') {
        this.createDirectory(cmd[1]);
      } else {
        this.addFile(+cmd[0], cmd[1]);
      }
    });
  }

  /**
   * dir command
   */
  createDirectory(name: string) {
    const newDirectory = new Directory(name, this.current);
    this.current.directories[name] = newDirectory;
  }

  /**
   * creates the file
   */
  addFile(fileSize: number, name: string) {
    const newFile = new File(name, fileSize);
    this.current.files[name] = newFile;

    this.current.size += fileSize;

    let previous = this.current.parent;

    while (previous !== null) {
      previous.size += fileSize;
      previous = previous.parent;
    }
  }

  /**
   * cd command
   */
  navigate(to: string) {
    if (to === '/') {
      this.current = this.root;
    } else if (to === '..' && this.current.parent !== null) {
      this.current = this.current.parent;
    } else {
      this.current = this.current.directories[to];
    }
  }

  findDirSizes(size: number) {
    let totalSize = 0;

    const queue = [...Object.values(this.root.directories)];

    while (queue.length > 0) {
      const current = queue.pop()!;

      if (current.size <= size) {
        totalSize += current.size;
      }

      queue.push(...Object.values(current.directories));
    }

    return totalSize;
  }
}

const files = new Filesystem(inputArr);
console.log(files.findDirSizes(100000));
