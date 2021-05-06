export class Vector {

    constructor(public x: number, public y: number) { }

    clone() {
        const newVector: this = Object.create(this);
        Object.assign(newVector, this);
        return newVector;
    }
    dividedBy(divisor: number): this {
        const newVector: this = this.clone();
        newVector.x = this.x / divisor;
        newVector.y = this.y / divisor;
        return newVector;
    }
    multipliedBy(divisor: number): this {
        const newVector: this = this.clone();
        newVector.x = this.x * divisor;
        newVector.y = this.y * divisor;
        return newVector;
    }
    rounded() {
        const newVector: this = this.clone();
        newVector.x = Math.round(this.x);
        newVector.y = Math.round(this.y);
        return newVector;
    }
    subtract(x_Vector: Vector | number, y?: number) {
        let addX: number;
        let addY: number;

        if (x_Vector instanceof Vector) {
            const loc = x_Vector as Vector;
            addX = loc.x;
            addY = loc.y;
        } else {
            const amount = x_Vector as number;
            addX = amount;
            addY = y | amount;
        }
        const newVector: this = this.clone();
        newVector.x = this.x - addX;
        newVector.y = this.y - addY;
        return newVector;
    }
    floored(lat = true, lon = true) {
        const newVector: this = this.clone();
        if (lat) {
            newVector.x = Math.floor(this.x);
        }
        if (lon) {
            newVector.y = Math.floor(this.y);
        }
        return newVector;
    }

    added(pixel: Vector | number, amountLat?: number): this {
        let addX: number;
        let addY: number;

        if (pixel instanceof Vector) {
            const loc = pixel as Vector;
            addX = loc.x;
            addY = loc.y;
        } else {
            const amount = pixel as number;
            addX = amount;
            addY = amountLat | amount;
        }
        const newVector: this = this.clone();
        newVector.x = this.x + addX;
        newVector.y = this.y + addY;
        return newVector;
    }
    equals(startPoint: Vector): boolean {
        return startPoint.x === this.x && startPoint.y === this.y;
    }

    limit(max: number) {
        const newVector: this = this.clone();
        newVector.x = Math.min(this.x, max);
        newVector.y = Math.min(this.y, max);
        return newVector;
    }

    atLeast(min: number | Vector): Vector {
        const newVector: this = this.clone();

        let minX: number;
        let minY: number

        if (min instanceof Vector) {
            minY = min.y
            minX = min.x
        } else {
            minX = min
            minY = min
        }

        newVector.x = Math.max(this.x, minX);
        newVector.y = Math.max(this.y, minY);
        return newVector;
    }


    length(): number {
        return Math.sqrt((this.x * this.x) + (this.y * this.y))
    }


    scaleTo(length) {
        return this.dividedBy(this.length()).multipliedBy(length)
    }
    toString() {
        return `{"lat":${this.x},"lon":${this.y}}`;
    }
}