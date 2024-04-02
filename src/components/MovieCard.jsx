// Import library SweetAlert2 untuk menampilkan alert
import React from "react";
import Swal from "sweetalert2";

// Komponen MovieCard untuk menampilkan detail film dan mengelola operasi pengeditan dan penghapusan
function MovieCard({ movie, deleteMovie, editMovie }) {
  // Fungsi untuk menangani penghapusan film
  const handleDelete = (id) => {
    // Tampilkan alert konfirmasi penghapusan
    Swal.fire({
      title: "Delete Movie", // Judul alert
      text: "Are you sure you want to delete this movie?", // Pertanyaan konfirmasi
      icon: "warning", // Jenis icon (warning)
      showCancelButton: true, // Tampilkan tombol Cancel
      confirmButtonColor: "#3085d6", // Warna tombol konfirmasi
      cancelButtonColor: "#d33", // Warna tombol cancel
      confirmButtonText: "Yes, delete it!", // Teks tombol konfirmasi
    }).then((result) => {
      // Ketika tombol konfirmasi ditekan
      if (result.isConfirmed) {
        // Panggil fungsi deleteMovie dengan id film yang akan dihapus
        deleteMovie(id);
        // Tampilkan alert sukses setelah film berhasil dihapus
        Swal.fire({
          icon: "success", // Jenis icon (success)
          title: "Success", // Judul alert
          text: "Movie deleted successfully", // Pesan sukses
          position: "center", // Posisi alert di tengah
          showConfirmButton: false, // Sembunyikan tombol konfirmasi
          timer: 1000, // Alert akan hilang setelah 1 detik
        });
      }
    });
  };

  // Fungsi untuk menangani pengeditan film
  const handleEdit = (id) => {
    // Tampilkan alert untuk pengeditan film
    Swal.fire({
      title: "Edit Movie", // Judul alert
      html: `
        <div class="text-left">
          <label for="editedTitle" class="block font-medium">Title:</label>
          <input type="text" id="editedTitle" class="w-2/3 swal2-input" value="${
            movie.title
          }" required>
          <label for="editedDirector" class="block font-medium mt-4">Director:</label>
          <input type="text" id="editedDirector" class="w-2/3 swal2-input" value="${
            movie.director
          }" required>
          <label for="editedSummary" class="block font-medium mt-4">Summary:</label>
          <textarea id="editedSummary" class="w-2/3 swal2-textarea" required>${
            movie.summary
          }</textarea>
          <label for="editedGenres" class="block font-medium mt-4">Genres:</label>
          <div id="editedGenres" class="flex flex-wrap">
            <label class="inline-flex items-center mr-4 mb-2">
              <input type="checkbox" class="form-checkbox h-5 w-5 text-blue-500" value="Drama" ${
                movie.genres.includes("Drama") ? "checked" : ""
              }>
              <span class="ml-2">Drama</span>
            </label>
            <label class="inline-flex items-center mr-4 mb-2">
              <input type="checkbox" class="form-checkbox h-5 w-5 text-blue-500" value="Action" ${
                movie.genres.includes("Action") ? "checked" : ""
              }>
              <span class="ml-2">Action</span>
            </label>
            <label class="inline-flex items-center mr-4 mb-2">
              <input type="checkbox" class="form-checkbox h-5 w-5 text-blue-500" value="Animation" ${
                movie.genres.includes("Animation") ? "checked" : ""
              }>
              <span class="ml-2">Animation</span>
            </label>
            <label class="inline-flex items-center mr-4 mb-2">
              <input type="checkbox" class="form-checkbox h-5 w-5 text-blue-500" value="Sci-Fi" ${
                movie.genres.includes("Sci-Fi") ? "checked" : ""
              }>
              <span class="ml-2">Sci-Fi</span>
            </label>
            <label class="inline-flex items-center mr-4 mb-2">
              <input type="checkbox" class="form-checkbox h-5 w-5 text-blue-500" value="Horror" ${
                movie.genres.includes("Horror") ? "checked" : ""
              }>
              <span class="ml-2">Horror</span>
            </label>
          </div>
        </div>
      `,
      showCancelButton: true, // Tampilkan tombol Cancel
      confirmButtonText: "Save", // Teks tombol konfirmasi
      cancelButtonText: "Cancel", // Teks tombol cancel
      showLoaderOnConfirm: true, // Tampilkan loader saat tombol konfirmasi ditekan
      preConfirm: () => {
        // Fungsi yang dijalankan sebelum alert dikonfirmasi
        const editedTitle = document.getElementById("editedTitle").value; // Ambil nilai judul yang diedit
        const editedDirector = document.getElementById("editedDirector").value; // Ambil nilai direktur yang diedit
        const editedSummary = document.getElementById("editedSummary").value; // Ambil nilai ringkasan yang diedit
        const editedGenres = Array.from(
          document.querySelectorAll(
            "#editedGenres input[type='checkbox']:checked"
          )
        ).map((input) => input.value);

        // Validasi apakah semua input telah diisi
        if (
          !editedTitle ||
          !editedDirector ||
          !editedSummary ||
          editedGenres.length === 0
        ) {
          Swal.showValidationMessage("Please fill in all fields!"); // Tampilkan pesan validasi
          return; // Hentikan proses
        }

        // Buat objek film yang diedit
        const editedMovie = {
          id: id, // Gunakan id yang sama dengan film yang diedit
          title: editedTitle, // Gunakan judul yang diedit
          director: editedDirector, // Gunakan direktur yang diedit
          summary: editedSummary, // Gunakan ringkasan yang diedit
          genres: editedGenres, // Gunakan genre yang diedit
        };

        // Panggil fungsi editMovie dengan id film dan data film yang diedit
        editMovie(id, editedMovie);
      },
    }).then((result) => {
      // Ketika tombol konfirmasi ditekan
      if (result.isConfirmed) {
        // Tampilkan alert sukses setelah film berhasil diedit
        Swal.fire({
          icon: "success", // Jenis icon (success)
          title: "Success", // Judul alert
          text: "Movie edited successfully", // Pesan sukses
          position: "center", // Posisi alert di tengah
          showConfirmButton: false, // Sembunyikan tombol konfirmasi
          timer: 1000, // Alert akan hilang setelah 1 detik
        });
      }
    });
  };

  // Render card movie
  return (
    <div className="bg-white shadow-md rounded-md p-4 m-4">
      {/* Tampilkan judul film */}
      <h2 className="text-lg font-bold">{movie.title}</h2>
      {/* Tampilkan informasi direktur film */}
      <p className="text-sm text-gray-500">
        Directed by <span className="italic">{movie.director}</span>
      </p>
      {/* Tampilkan ringkasan film */}
      <p className="text-sm mt-2">{movie.summary}</p>
      {/* Tampilkan genre-genre film */}
      <p className="text-sm mt-2">Genres: {movie.genres.join(", ")}</p>
      {/* Tombol untuk edit dan hapus film */}
      <div className="mt-4 flex">
        {/* Tombol edit film */}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={() => handleEdit(movie.id)}
        >
          Edit
        </button>
        {/* Tombol hapus film */}
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleDelete(movie.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
