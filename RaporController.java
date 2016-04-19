package id.pkl.raport.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import id.pkl.raport.entity.KelasSiswa;
import id.pkl.raport.entity.Penilaian;
import id.pkl.raport.repository.PenilaianRepository;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(value="/rapor/{kelasid}/siswa")
public class RaporController {
	@Autowired
	private PenilaianRepository penilaianRepository;

	@RequestMapping(method=RequestMethod.GET)
	public Page<KelasSiswa> listRapor(@RequestParam(name="search", required = false) String search,
											@PathVariable("kelasid") Long kelasId,
											Pageable pageable){
		System.out.print("MASUK SINI--");
		return penilaianRepository.findByKelasSiswaId(kelasId, pageable);	
	}
	@RequestMapping(value = "/{siswaid}", method=RequestMethod.GET)
	public Map<String, Double> listNilaiSiswa(@PathVariable("kelasid") Long kelasId, @PathVariable("siswaid") Long siswaid){
		System.out.print("MASUK LIST NILAI--");
		/*
		* Menentukan bobot nilai UTS, UAS, dll (jumlahnya harus sama dengan 1 atau 100%)
		* dan Menentukan jumlah kuis dan ulangan
		* */
		Double uts = 0.4, uas = 0.4, kuis = 0.1, ulanganHarian = 0.1;
		Integer jumlahKuis = 5, jumlahUlangan = 5;

		/*
		* Total nilai dari keseluruhan
		* */
		Double totalNilai = 0.0;
		Map<String, Double> nilaiMataPelajaran = new HashMap<String, Double>();

		/*
		* List Penilaian berdasarkan @kelasid dan @siswaid
		* */
		Iterable<Penilaian> listPenilaian = penilaianRepository.listNilaiSiswa(kelasId, siswaid);
		Long idMatpelSementara = (long) 0;
		for(Penilaian penilaian : listPenilaian){
			String namaMatpel = penilaian.getMataPelajaran().getNamaMatpel();
			String kkm = String.valueOf(penilaian.getKkm());
			String key = namaMatpel+"-"+kkm;

			//Inisialisasi nilai kuis, nilaiulangan, dll
			Double nilaiKuis = 0.0, nilaiUlangan = 0.0;

			/*
			* Cek berdasarkan kriteria
			* */
			if(penilaian.getKriteria().getNamaKriteria().equals("UTS")){
				totalNilai += uts * penilaian.getNilai();
			}else if(penilaian.getKriteria().getNamaKriteria().equals("UAS")){
				totalNilai += uas * penilaian.getNilai();
			}else{
				/*
				* Bisa diganti(tambah/hapus) sesuai dengan kriteria yang ada di database
				* */
				if(penilaian.getKriteria().getNamaKriteria().equals("Kuis")){
					nilaiKuis = kuis * penilaian.getNilai();
				}else if(penilaian.getKriteria().getNamaKriteria().equals("Ulangan Harian")){
					nilaiUlangan = ulanganHarian * penilaian.getNilai();
				}
			}

			//Cek selain nilai uts dan uas
			if(nilaiKuis.compareTo(0.0) > 1){
				nilaiKuis /= jumlahKuis;
			}
			if(nilaiUlangan.compareTo(0.0) > 1){
				nilaiUlangan /= jumlahUlangan;
			}

			totalNilai += nilaiKuis + nilaiUlangan;

			if(idMatpelSementara != penilaian.getMataPelajaran().getId()){
				nilaiMataPelajaran.put(key, totalNilai);
			}else{
				nilaiMataPelajaran.replace(key, nilaiMataPelajaran.get(key) + totalNilai);
			}
			totalNilai = 0.0;
			idMatpelSementara = penilaian.getMataPelajaran().getId();
		}

		/*Keluarannya JSON
		* Tinggal di masukkin ke dalam list nya saja
		* 'Matpel-KKM' : NilaiAkhir
		* JSON :
		 {
			'Matematika-70' : 90,
			'Bahasa Indonesia-70' : 80
		 }
		* */
		return nilaiMataPelajaran;
	}
}
