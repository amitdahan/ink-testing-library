import { EventEmitter } from 'node:events';
import { render as inkRender } from 'ink';
class Stdout extends EventEmitter {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "frames", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "_lastFrame", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "write", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (frame) => {
                this.frames.push(frame);
                this._lastFrame = frame;
            }
        });
        Object.defineProperty(this, "lastFrame", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => this._lastFrame
        });
    }
    get columns() {
        return 100;
    }
}
class Stderr extends EventEmitter {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "frames", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "_lastFrame", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "write", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (frame) => {
                this.frames.push(frame);
                this._lastFrame = frame;
            }
        });
        Object.defineProperty(this, "lastFrame", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => this._lastFrame
        });
    }
}
class Stdin extends EventEmitter {
    constructor() {
        super(...arguments);
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Object.defineProperty(this, "isTTY", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "write", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (data) => {
                this.emit('data', data);
            }
        });
    }
    setEncoding() {
        // Do nothing
    }
    setRawMode() {
        // Do nothing
    }
    resume() {
        // Do nothing
    }
    pause() {
        // Do nothing
    }
}
const instances = [];
export const render = (tree) => {
    const stdout = new Stdout();
    const stderr = new Stderr();
    const stdin = new Stdin();
    const instance = inkRender(tree, {
        // @ts-expect-error - mock stdout
        stdout,
        // @ts-expect-error - mock stderr
        stderr,
        // @ts-expect-error - mock stdin
        stdin,
        debug: true,
        exitOnCtrlC: false,
        patchConsole: false
    });
    instances.push(instance);
    return {
        rerender: instance.rerender,
        unmount: instance.unmount,
        cleanup: instance.cleanup,
        stdout,
        stderr,
        stdin,
        frames: stdout.frames,
        lastFrame: stdout.lastFrame
    };
};
export const cleanup = () => {
    for (const instance of instances) {
        instance.unmount();
        instance.cleanup();
    }
};
//# sourceMappingURL=index.js.map