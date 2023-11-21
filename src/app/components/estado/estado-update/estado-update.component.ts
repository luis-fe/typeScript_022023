import { Component, Input, OnInit } from '@angular/core';
import { Estado } from '../estado.model';
import { EstadoService } from '../estado.service';
import { ActivatedRoute, Router } from '@angular/router';
import { empty } from 'rxjs';

@Component({
  selector: 'app-estado-update',
  templateUrl: './estado-update.component.html',
  styleUrls: ['./estado-update.component.css']
})
export class EstadoUpdateComponent implements OnInit {

  estado: Estado = {"nome": "", "sigla": ""};

  constructor(
    private estadoService: EstadoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id: string | null  = this.route.snapshot.paramMap.get("id");
    console.log(id + " Passou aki")

    if (id !== null) {
      this.estadoService.readById(id).subscribe((estado) => {
        this.estado = estado
      }, error => alert("Não foi possivel executar a operação!"));
    }
  }

  updateEstado(): void {
    this.estadoService.update(this.estado).subscribe(()=> {
      this.estadoService.showMessage("Estado atualizado com sucesso!");
      this.router.navigate(["/estados"]);
    }, error => alert("Não foi possivel executar a operação!"));
  }

  cancel(): void {
    this.router.navigate(["/estados"]);
  }

}
