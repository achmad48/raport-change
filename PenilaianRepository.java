package id.pkl.raport.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import id.pkl.raport.entity.KelasSiswa;
import id.pkl.raport.entity.Kkm;
import id.pkl.raport.entity.Penilaian;
import scala.collection.Map;

public interface PenilaianRepository extends JpaRepository<Penilaian, Long> {
	@Query("SELECT penilaian FROM Penilaian penilaian WHERE LOWER(penilaian.nilai) LIKE LOWER(CONCAT('%', :search, '%'))"
			+ "OR LOWER(penilaian.kriteria.namaKriteria) LIKE LOWER(CONCAT('%', :search, '%'))"
			+ "OR LOWER(penilaian.keterangan) LIKE LOWER(CONCAT('%', :search, '%'))")
	Page<Penilaian> findBySearch(@Param("search") String searchField, Pageable pageable);
	
	@Query("SELECT penilaian FROM Penilaian penilaian JOIN penilaian.kelasSiswa kelasSiswa WHERE kelasSiswa.kelas.id = :kelasId")
	Page<Penilaian> findByKelasId(@Param("kelasId") Long kelasId, Pageable pageable);
	
	@Query("SELECT kelasSiswa FROM KelasSiswa kelasSiswa JOIN kelasSiswa.siswa siswa WHERE kelasSiswa.kelas.id = :kelasId")
	Page<KelasSiswa> findByKelasSiswaId(@Param("kelasId") Long kelasId, Pageable pageable);
	
	@Query("SELECT penilaian FROM Penilaian penilaian JOIN penilaian.kelasSiswa kelasSiswa WHERE kelasSiswa.id = :kelasSiswaId")
	Page<Penilaian> findBySiswaId(@Param("kelasSiswaId") Long kelasSiswaId, Pageable pageable);
	
	@Query("SELECT kkm FROM Kkm kkm WHERE mataPelajaran.id = :matpel and tingkat.id = :tingkat")
	Kkm findByIdMatpelAndTingkat(@Param("matpel") Long matpel, @Param("tingkat") Long tingkat);

	@Query("SELECT penilaian FROM Penilaian penilaian JOIN penilaian.kelasSiswa kelasSiswa JOIN penilaian.kriteria kriteria " +
			"JOIN penilaian.mataPelajaran mataPelajaran WHERE kelasSiswa.kelas.id = :kelasid AND kelasSiswa.siswa.id = :siswaid " +
			"ORDER BY mataPelajaran.namaMatpel ASC")
	Iterable<Penilaian> listNilaiSiswa(@Param("kelasid") Long kelasid,@Param("siswaid") Long siswaid);
}
