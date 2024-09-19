<?php

namespace App\Entity;

use App\Repository\ConsultaRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ConsultaRepository::class)]
class Consulta
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $medico_crm = null;

    #[ORM\Column(length: 255)]
    private ?string $paciente_cpf = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $dia = null;

    #[ORM\Column(type: Types::TIME_MUTABLE)]
    private ?\DateTimeInterface $hora_inicio = null;

    #[ORM\Column(type: Types::TIME_MUTABLE)]
    private ?\DateTimeInterface $hora_final = null;

    #[ORM\Column(length: 255)]
    private ?string $tipo = null;

    #[ORM\Column(length: 255)]
    private ?string $situação = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(string $id): static
    {
        $this->id = $id;

        return $this;
    }

    public function getMedicoCrm(): ?string
    {
        return $this->medico_crm;
    }

    public function setMedicoCrm(string $medico_crm): static
    {
        $this->medico_crm = $medico_crm;

        return $this;
    }

    public function getPacienteCpf(): ?string
    {
        return $this->paciente_cpf;
    }

    public function setPacienteCpf(string $paciente_cpf): static
    {
        $this->paciente_cpf = $paciente_cpf;

        return $this;
    }

    public function getDia(): ?\DateTimeInterface
    {
        return $this->dia;
    }

    public function setDia(\DateTimeInterface $dia): static
    {
        $this->dia = $dia;

        return $this;
    }

    public function getHoraInicio(): ?\DateTimeInterface
    {
        return $this->hora_inicio;
    }

    public function setHoraInicio(\DateTimeInterface $hora_inicio): static
    {
        $this->hora_inicio = $hora_inicio;

        return $this;
    }

    public function getHoraFinal(): ?\DateTimeInterface
    {
        return $this->hora_final;
    }

    public function setHoraFinal(\DateTimeInterface $hora_final): static
    {
        $this->hora_final = $hora_final;

        return $this;
    }

    public function getTipo(): ?string
    {
        return $this->tipo;
    }

    public function setTipo(string $tipo): static
    {
        $this->tipo = $tipo;

        return $this;
    }
}
