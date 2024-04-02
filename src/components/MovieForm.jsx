import React from "react"; // Impor library React untuk membuat komponen
import Swal from "sweetalert2"; // Impor library SweetAlert2 untuk menampilkan alert

function MovieForm({ addMovie }) {
  // Deklarasi komponen MovieForm dengan prop addMovie
  // Fungsi untuk menampilkan form tambah movie saat tombol tambah ditekan
  const handleToggleForm = () => {
    // Tampilkan SweetAlert untuk form tambah movie
    Swal.fire({
      title: "Add New Movie", // Judul SweetAlert
      html: `
        <div class="text-left">
          <label for="title" class="block font-medium">Title:</label>
          <input type="text" id="title" class="w-2/3 mx-5 swal2-input" required>
          <label for="director" class="block font-medium mt-4">Director:</label>
          <input type="text" id="director" class="w-2/3 mx-5 swal2-input" required>
          <label for="summary" class="block font-medium mt-4">Summary:</label>
          <textarea id="summary" class="w-2/3 mx-5 swal2-textarea" required></textarea>
          <label class="block font-medium mt-4">Genres:</label>
          <div class="flex flex-wrap">
            <!-- Checkbox untuk memilih genre-genre film -->
            <label class="inline-flex items-center mr-4 mb-2">
              <input type="checkbox" class="form-checkbox h-5 w-5 text-blue-500" value="Drama">
              <span class="ml-2">Drama</span>
            </label>
            <label class="inline-flex items-center mr-4 mb-2">
              <input type="checkbox" class="form-checkbox h-5 w-5 text-blue-500" value="Action">
              <span class="ml-2">Action</span>
            </label>
            <label class="inline-flex items-center mr-4 mb-2">
              <input type="checkbox" class="form-checkbox h-5 w-5 text-blue-500" value="Animation">
              <span class="ml-2">Animation</span>
            </label>
            <label class="inline-flex items-center mr-4 mb-2">
              <input type="checkbox" class="form-checkbox h-5 w-5 text-blue-500" value="Sci-Fi">
              <span class="ml-2">Sci-Fi</span>
            </label>
            <label class="inline-flex items-center mr-4 mb-2">
              <input type="checkbox" class="form-checkbox h-5 w-5 text-blue-500" value="Horror">
              <span class="ml-2">Horror</span>
            </label>
          </div>
        </div>
      `, // Isi form tambah movie dalam HTML
      showCancelButton: true, // Tampilkan tombol Cancel
      confirmButtonText: "Add Movie", // Teks tombol konfirmasi
      // Fungsi yang dijalankan sebelum SweetAlert dikonfirmasi
      preConfirm: () => {
        const title = document.getElementById("title").value; // Ambil nilai judul dari input title
        const director = document.getElementById("director").value; // Ambil nilai direktur dari input director
        const summary = document.getElementById("summary").value; // Ambil nilai ringkasan dari textarea summary
        const genres = Array.from(
          // Ambil nilai genre-genre film yang dipilih
          document.querySelectorAll(".form-checkbox:checked")
        ).map((input) => input.value); // Ubah nilai menjadi array
        // Validasi apakah semua input telah diisi
        if (!title || !director || !summary || genres.length === 0) {
          Swal.showValidationMessage("Please fill in all fields"); // Tampilkan pesan validasi
        }
        // Kembalikan data movie yang diisi dalam objek
        return { title, director, summary, genres };
      },
      allowOutsideClick: () => !Swal.isLoading(), // Aktifkan klik di luar SweetAlert saat tidak sedang loading
    }).then((result) => {
      // Setelah SweetAlert dikonfirmasi
      if (result.isConfirmed) {
        // Jika konfirmasi dilakukan
        const formData = result.value; // Ambil data movie yang diisi dari hasil konfirmasi
        addMovie(formData); // Panggil fungsi addMovie dengan data movie yang diisi
        // Tampilkan alert sukses setelah movie berhasil ditambahkan
        Swal.fire({
          icon: "success", // Jenis icon (success)
          title: "Success", // Judul alert
          text: "Movie added successfully", // Pesan sukses
          position: "center", // Posisi alert di tengah layar
          showConfirmButton: false, // Tampilkan tombol OK
          timer: 1000, // Waktu alert ditampilkan (1000ms = 1 detik)
        });
      }
    });
  };

  return (
    // Tombol untuk menampilkan form tambah movie
    <div className="fixed bottom-4 right-4 z-50">
      <button
        className="bg-blue-500 text-white p-3 rounded-full shadow-md hover:bg-blue-600"
        onClick={handleToggleForm} // Panggil fungsi handleToggleForm saat tombol ditekan
      >
        +
      </button>
    </div>
  );
}

export default MovieForm; // Ekspor komponen MovieForm untuk digunakan di file lain
