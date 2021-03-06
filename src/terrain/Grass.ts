import Entity from 'src/entity';
import * as THREE from 'three'
import { Geometry, InstancedMesh, MeshLambertMaterial, Object3D } from 'three';
import TerrainBufferGeometry from './TerrainBufferGeometry'

export class Grass implements Entity {
    public object: Object3D;
    terrain: TerrainBufferGeometry;
    count: number;
    limit: number;

    constructor(terrainBufferGeometry: TerrainBufferGeometry, count: number, limit: number) {
        this.terrain = terrainBufferGeometry;
        this.count = count;
        this.limit = limit;
        const vertices: number[] = [];

        const gaussianRand = function() {
            let rand = 0;
            for (let i = 0; i < 6; i += 1) {
              rand += Math.random();
            }
            return rand/6;
        }

        for (let i = 0; i < count; i++) {
            
            let y = limit;
            let x = 0;
            let z = 0;
            while (y >= limit) {
                x = -100 + gaussianRand()*200;
                z = -100 + gaussianRand()*200;
                y = terrainBufferGeometry.getHeightAt(x, z);
            }
            vertices.push(x, y, z);
        }
        const sprite = new THREE.TextureLoader().load( './resources/grasstust.png' );
        const material = new THREE.PointsMaterial({size: 2, sizeAttenuation: true, map: sprite, alphaTest: 0.5, transparent: true});
        material.color.setRGB( 1.0, 1.0, 1.0 );
        const geometry = new THREE.BufferGeometry();

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

        this.object = new THREE.Points(geometry, material);
        this.object.translateY(-4.6);
    }

    update() {        
    }
}