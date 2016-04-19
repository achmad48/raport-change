'use strict';
angular.module('raportApp')
	.factory('ProvinsiService', function($resource){
		return $resource('/provinsi/:id', {}, {
			get: {method: 'GET'},
			create: {method: 'POST'},
			update: {method: 'PUT', params: {id: '@id'}},
			delete: {method: 'DELETE', params: {id: '@id'}}
		})
	})
	.factory('KabupatenService', function($resource){
		return $resource('/kabupaten/:id', {}, {
			get: {method: 'GET'},
			create: {method: 'POST'},
			update: {method: 'PUT', params: {id: '@id'}},
			delete: {method: 'DELETE', params: {id: '@id'}}
		})
	})
	.factory('KecamatanService', function($resource){
		return $resource('/kecamatan/:id', {}, {
			get: {method: 'GET'},
			create: {method: 'POST'},
			update: {method: 'PUT', params: {id: '@id'}},
			delete: {method: 'DELETE', params: {id: '@id'}}
		})
	})
	.factory('AbsensiSiswaService', function($resource){
		return $resource('/absensi/siswa/:id', {}, {
			get: {method: 'GET'},
			create: {method: 'POST'},
			update: {method: 'PUT', params: {id: '@id'}},
			delete: {method: 'DELETE', params: {id: '@id'}}
		})
	})
	.factory('GuruService', function($resource){
		return $resource('/guru/:id', {}, {
			get: {method: 'GET'},
			create: {method: 'POST'},
			update: {method: 'PUT', params: {id: '@id'}},
			delete: {method: 'DELETE', params: {id: '@id'}}
		})
	})
	.factory('HariLiburService', function($resource){
		return $resource('/hari-libur/:id', {}, {
			get: {method: 'GET'},
			create: {method: 'POST'},
			update: {method: 'PUT', params: {id: '@id'}},
			delete: {method: 'DELETE', params: {id: '@id'}}
		})
	})
	.factory('KelasService', function($resource){
		return $resource('/kelas/:id', {}, {
			get: {method: 'GET'},
			create: {method: 'POST'},
			update: {method: 'PUT', params: {id: '@id'}},
			delete: {method: 'DELETE', params: {id: '@id'}}
		})
	})
	.factory('KelasSiswaService', function($resource){
		return $resource('/kelas/siswa/:id/:other', {}, {
			get: {method: 'GET'},
			getArray: {method: 'GET', isArray : true},
			create: {method: 'POST'},
			update: {method: 'PUT', params: {id: '@id'}},
			delete: {method: 'DELETE', params: {id: '@id'}}
		})
	})
	.factory('KkmService', function($resource){
		return $resource('/kkm/:id', {}, {
			get: {method: 'GET'},
			create: {method: 'POST'},
			update: {method: 'PUT', params: {id: '@id'}},
			delete: {method: 'DELETE', params: {id: '@id'}}
		})
	})
	.factory('KompetensiDasarService', function($resource){
		return $resource('/kompetensi-dasar/:id', {}, {
			get: {method: 'GET'},
			create: {method: 'POST'},
			update: {method: 'PUT', params: {id: '@id'}},
			delete: {method: 'DELETE', params: {id: '@id'}}
		})
	})
	.factory('MengajarService', function($resource){
		return $resource('/guru/mengajar/:idGuru/:idMatpel', {}, {
			get: {method: 'GET'},
			create: {method: 'POST'},
			delete: {method: 'DELETE', params: {idGuru: '@idGuru', idMatpel: '@idMatpel'}}
		})
	})
	.factory('KriteriaService', function($resource){
		return $resource('/kriteria/:id', {}, {
			get: {method: 'GET'},
			create: {method: 'POST'},
			update: {method: 'PUT', params: {id: '@id'}},
			delete: {method: 'DELETE', params: {id: '@id'}}
		})
	})
	.factory('MataPelajaranService', function($resource){
		return $resource('/mata/pelajaran/:id', {}, {
			get: {method: 'GET'},
			create: {method: 'POST'},
			update: {method: 'PUT', params: {id: '@id'}},
			delete: {method: 'DELETE', params: {id: '@id'}}
		})
	})
	.factory('MateriPokokService', function($resource){
		return $resource('/materi/pokok/:id', {}, {
			get: {method: 'GET'},
			create: {method: 'POST'},
			update: {method: 'PUT', params: {id: '@id'}},
			delete: {method: 'DELETE', params: {id: '@id'}}
		})
	})
	.factory('SekolahService', function($resource){
		return $resource('/sekolah/:id', {}, {
			get: {method: 'GET'},
			create: {method: 'POST'},
			update: {method: 'PUT', params: {id: '@id'}},
			delete: {method: 'DELETE', params: {id: '@id'}}
		})
	})
	.factory('SiswaService', function($resource){
		return $resource('/siswa/:id', {}, {
			get: {method: 'GET'},
			create: {method: 'POST'},
			update: {method: 'PUT', params: {id: '@id'}},
			delete: {method: 'DELETE', params: {id: '@id'}}
		})
	})
	.factory('TahunAjaranService', function($resource){
		return $resource('/tahun/ajaran/:id', {}, {
			get: {method: 'GET'},
			create: {method: 'POST'},
			update: {method: 'PUT', params: {id: '@id'}},
			delete: {method: 'DELETE', params: {id: '@id'}}
		})
	})
	.factory('GrupKelasService', function($resource){
		return $resource('/grup/kelas/:id', {}, {
			get: {method: 'GET'},
			create: {method: 'POST'},
			update: {method: 'PUT', params: {id: '@id'}},
			delete: {method: 'DELETE', params: {id: '@id'}}
		})
	})
	.factory('TingkatService', function($resource){
		return $resource('/tingkat/:id', {}, {
			get: {method: 'GET'},
			create: {method: 'POST'},
			update: {method: 'PUT', params: {id: '@id'}},
			delete: {method: 'DELETE', params: {id: '@id'}}
		})
	})
	.factory('RoleService', function($resource){
		return $resource('/user/role/:id', {}, {
			get: {method: 'GET'},
			create: {method: 'POST'},
			update: {method: 'PUT', params: {id: '@id'}},
			delete: {method: 'DELETE', params: {id: '@id'}}
		})
	})
	.factory('PenilaianService', function($resource){
		return $resource('/penilaian/:id', {}, {
			get: {method: 'GET'},
			create: {method: 'POST'},
			update: {method: 'PUT', params: {id: '@id'}},
			delete: {method: 'DELETE', params: {id: '@id'}}
		})
	})
	.factory('UserService', function($resource){
		return $resource('/pengguna/:id', {}, {
			get: {method: 'GET'},
			create: {method: 'POST'},
			update: {method: 'PUT', params: {id: '@id'}},
			delete: {method: 'DELETE', params: {id: '@id'}}
		})
	})
	.factory('RaportService', function($resource){
		return $resource('rapor/:idkelas/siswa/:id', {}, {
			get: {method: 'GET'},
			create: {method: 'POST'},
			update: {method: 'PUT', params: {id: '@id'}},
			delete: {method: 'DELETE', params: {id: '@id'}}
		})
	});