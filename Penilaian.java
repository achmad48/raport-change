package id.pkl.raport.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotBlank;

@Entity
@Table(name="penilaian", uniqueConstraints = @UniqueConstraint(columnNames={"kelas_siswa", "kriteria", "mata_pelajaran"}))
public class Penilaian {
	@Id
	@GeneratedValue
	@Column(name="id")
	private Long id;
	
	@OneToOne
	@JoinColumn(name="kriteria", referencedColumnName="id")
	private Kriteria kriteria;
	
	@OneToOne
	@JoinColumn(name="kelas_siswa", referencedColumnName="id")
	private KelasSiswa kelasSiswa;
	
	@OneToOne
	@JoinColumn(name="mata_pelajaran", referencedColumnName="id")
	private MataPelajaran mataPelajaran;
	
	@NotNull
	@Column(name="nilai")
	private Integer nilai;

	@Column(name="kkm")
	private Integer kkm;

	@Column(name="keterangan")
	private String keterangan;


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public Kriteria getKriteria() {
		return kriteria;
	}


	public void setKriteria(Kriteria kriteria) {
		this.kriteria = kriteria;
	}


	public KelasSiswa getKelasSiswa() {
		return kelasSiswa;
	}


	public void setKelasSiswa(KelasSiswa kelasSiswa) {
		this.kelasSiswa = kelasSiswa;
	}


	public MataPelajaran getMataPelajaran() {
		return mataPelajaran;
	}


	public void setMataPelajaran(MataPelajaran mataPelajaran) {
		this.mataPelajaran = mataPelajaran;
	}


	public Integer getNilai() {
		return nilai;
	}


	public void setNilai(Integer nilai) {
		this.nilai = nilai;
	}


	public String getKeterangan() {
		return keterangan;
	}


	public void setKeterangan(String keterangan) {
		this.keterangan = keterangan;
	}

	public Integer getKkm() {
		return kkm;
	}

	public void setKkm(Integer kkm) {
		this.kkm = kkm;
	}
}
