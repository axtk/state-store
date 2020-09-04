export default function toPath(path) {
    return Array.isArray(path) ? path : (typeof path === 'string' ? path.split('.') : [path]);
};

// @test expect(toPath('foo.bar')).toEqual(['foo', 'bar']);
// @test expect(toPath('foo')).toEqual(['foo']);
// @test expect(toPath(0)).toEqual([0]);
// @test expect(toPath([0, 'foo'])).toEqual([0, 'foo']);
// @test expect(toPath('foo.0')).toEqual(['foo', '0']);
